var Instagram = require('../models/instagram'),
    ig = require('instagram-node-lib'),
    auth = require('../config/auth.js'),
    util = require('util');

  ig.set('client_id', auth.instagram.client_id);
  ig.set('client_secret', auth.instagram.client_secret);

  var instagram_tags = [
    'victorvictoriasalon',
    'victorvictoriaomaha'
  ];  


  var blocked_users = [
    // 'chasing_beauty_photography_',
    // 'sbqueenofclean'
  ];

  function saveInstagrams(results) {
    var data = results;
    data.forEach(function(instagram) {
      if ( blocked_users.indexOf(instagram.user.username) > -1  ){
        instagram.blocked = true;
      }
      Instagram.update({id: instagram.id}, instagram, {upsert: true, multi: false}, function( err , numberAffected , raw ){ });
    });
  }

  function grabTags( tag , next_id, count){
    console.log('grabTags count #'+ count);
    ig.tags.recent({
      name: tag,
      max_id: next_id,
      complete: function(data, pagination) {
        data.forEach(function(instagram) {
          if ( blocked_users.indexOf(instagram.user.username) > -1  ){
            instagram.blocked = true;
          }

          Instagram.findOneAndUpdate({id: instagram.id}, instagram, {upsert: true}, function( err , instagram_item ){
            if ( err ){ 
              console.log('  grabTags err: '+err);
            }
            if (instagram_item){ }
          });
        });

        if ( pagination.next_max_tag_id && (count < 50) ) {
          grabTags( tag , pagination.next_max_tag_id, count + 1 );
        } else {
          console.log('  Finished grabbing tag: '+ tag);
          return false;
        }
      }
    });
  }

  function pollTags() {
    console.log('pollInstagram:');
    for ( i in instagram_tags) {
      console.log('  tag: ' + instagram_tags[i]);
      grabTags(instagram_tags[i], null, 0);
    }
  }


  function pollInstagram() {
    console.log('pollInstagram:');
    for ( i in instagram_tags) {
      console.log('  tag: ' + instagram_tags[i]);
      ig.tags.recent({
          name: instagram_tags[i],
          complete: function(data) {
            saveInstagrams(data);
          }
      });
    }
  }

  Instagram.count({}, function(err, count){
    console.log(count + ' instagrams found.');
    if (count == 0) {
      console.log('Polling Tags.')
      pollTags();
    }
  });
  
  if ( process.env.NODE_ENV == 'development' ) {
    // setInterval( pollInstagram , 4000);
  }
  if ( process.env.NODE_ENV == 'production' ) {
    pollTags();
    setInterval( pollInstagram , 6000);
  }
    