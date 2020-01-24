const axios = require('axios');
const Dev = require('../models/Dev');
const str2array = require('./utils/str2array');
const { findConnections, sendMessage } = require('../websocket');

/**
 * Query params: req.query
 * Route params: req.params
 * Body: req.body
 */

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        return res.json({devs});
    },

    async create(req, res) {
        const { github_user, techs, latitude, longitude } = req.body;

        const devFound = await Dev.findOne({github_user})
        if(!!devFound) return res.json(devFound);

        const apiResponse = await axios.get(`https://api.github.com/users/${github_user}`);
        
        // const { name = login, avatar_url, bio } = apiResponse.data;
        // 'Default values' do not work for null values <https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Parametros_Predefinidos>
        let { name, avatar_url, bio } = apiResponse.data;
        if(name == null) name = github_user;
        techsArray = str2array(techs)
    
        if(!longitude && !latitude) return res.status(400).send("Invalid latitude/longitude");

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        
        const dev = await Dev.create({
            github_user,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });

        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray
        );

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    
        return res.json(dev);
    },

    async read(req, res) {
        const { github_user } = req.params;
        const dev = await Dev.findOne({github_user});
        
        return res.json(dev != null ? dev : {});
    },

    async update(req, res) {
        const { github_user } = req.params;
        const dev = await Dev.findOne({github_user});
        const { latitude, longitude, techs, ...rest} = req.body;
        rest.github_user = github_user;
        if (latitude && longitude)
            var newLocation = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        if (techs)
            var techsArray = str2array(techs);
        const newDev = await Dev.updateOne({ github_user }, {
            location: (latitude&&longitude) ? newLocation : dev.location,
            techs: techs ? techsArray : dev.techs,
            ...rest
        });

        return res.json({
            modifiedCount: newDev.nModified,
            ok: newDev.ok
        });
    },

    async delete(req, res) {
        const { github_user } = req.params;
        await Dev.deleteOne({ github_user });
        return res.json();
    }
}