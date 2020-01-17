const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async show(request, response) {
        const { id } = request.params;

        const dev = await Dev.findById(id);

        if (dev) {            
            return response.json(dev);
        }
        else {
            return response.json({message: 'Dev não encontrado.'});    
        }
    },

    async destroy(request, response) {
        const { id } = request.params;

        let dev = await Dev.findByIdAndDelete(id);
        let msg = '';

        if (dev) {
           
                msg = 'Dev removido.';    
        }         
        else {
            msg = 'Dev não encontrado.';
        }

        return response.json({message: msg});
    },

    async store(request, response){
        const {github_username, techs, latitude, longitude} = request.body;
        
        let dev = await Dev.findOne({ github_username });
        
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            const {name = login, avatar_url, bio} = apiResponse.data;    
            const techsArray =  parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });

            const sendSocketMessageTo = findConnections({latitude, longitude} , techsArray);

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
            
        return response.json(dev);
    },

    async update(request, response) {
        const { id, techs = [], latitude, longitude, name, bio } = request.body;

        try {           
        
            let dev = await Dev.findById(id);
            
            if (dev) {

                const techsArray =  parseStringAsArray(techs);
                
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
                
                dev.name = name;
                dev.bio = bio;
                dev.techs = techsArray;
                dev.location = location;
                
                await dev.save();

                return response.json(dev);
            }

            return response.json({ message: 'Dev não encontrado.'});
        
        } catch (error) {
            return response.json({message: 'Algo aconteceu...'});
        }
    }
}