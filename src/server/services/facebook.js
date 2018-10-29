var Bluebird = require('bluebird');
var _ = require('lodash');
var request = require('request-promise');
// make a usermap file if you want to use names of your friends instead of ids
var USERMAP = require('./usermap.json');

var facebookService = {};

facebookService.getUsers = _.memoize(function (accessToken, userIds) {
    var users = _(userIds).map(function (id) {
        var name = USERMAP[id];
        return {
            id: id,
            name: name ? name : id
        }
    })

    return Bluebird.resolve(users);
});

// facebookService.getUsers = _.memoize(function(accessToken, userIds) {
//     var promises = _.chunk(userIds, 50).map(function(userIdChunk) {
//         return request({
//             url: 'https://graph.facebook.com',
//             qs: {
//                 ids: userIdChunk.join(','),
//                 access_token: accessToken
//             },
//             json: true,
//             gzip: true
//         })
//         .catch(function(res) {
//             facebookService.getUsers.cache.delete(accessToken);
//             if (_.has(res, 'response.body.error')) {
//                 throw res.response.body.error;
//             }
//             throw res;
//         });
//     });

//     return Bluebird.all(promises).then(function(response) {
//         return _.assign.apply(_, response);
//     });
// });

module.exports = facebookService;

