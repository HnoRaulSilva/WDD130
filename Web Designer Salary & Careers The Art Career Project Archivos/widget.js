var esy_serverFQDN = 'https://www.esyoh.com';
var esy_options;

//fingerprint
function generate_hash(key, seed) {

  var keyLength, tailLength, bodyLength, h1, k1, i, c1_low, c1_high, c2_low, c2_high, c3;

  keyLength = key.length;
  tailLength = keyLength & 3;
  bodyLength = keyLength - tailLength;
  h1 = seed;

  //c1 = 0xcc9e2d51;
  c1_low = 0x2d51;
  c1_high = 0xcc9e0000;

  //c2 = 0x1b873593;
  c2_low = 0x3593;
  c2_high = 0x1b870000;

  c3 = 0xe6546b64;


  //----------
  // body

  i = 0;

  while (i < bodyLength) {

      k1 =
          ((key.charCodeAt(i) & 0xff)) |
          ((key.charCodeAt(++i) & 0xff) << 8) |
          ((key.charCodeAt(++i) & 0xff) << 16) |
          ((key.charCodeAt(++i) & 0xff) << 24);

      ++i;


      //k1 *= c1;
      k1 = (c1_high * k1 | 0) + (c1_low * k1);
      //k1 = ROTL32(k1,15);
      k1 = (k1 << 15) | (k1 >>> 17);
      //k1 *= c2;
      k1 = (c2_high * k1 | 0) + (c2_low * k1);

      //h1 ^= k1;
      h1 ^= k1;
      //h1 = ROTL32(h1,13); 
      h1 = (h1 << 13) | (h1 >>> 19);
      //h1 = h1*5+0xe6546b64;
      h1 = h1 * 5 + c3;

  }   //while (i < bodyLength) {


  //----------
  // tail

  k1 = 0;

  switch (tailLength) {

      case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      case 1: k1 ^= (key.charCodeAt(i) & 0xff);

          //k1 *= c1;
          k1 = (c1_high * k1 | 0) + (c1_low * k1);
          //k1 = ROTL32(k1,15);
          k1 = (k1 << 15) | (k1 >>> 17);
          //k1 *= c2;
          k1 = (c2_high * k1 | 0) + (c2_low * k1);
          //h1 ^= k1;
          h1 ^= k1;

  }   //switch (tailLength) {


  //----------
  // finalization

  h1 ^= keyLength;

  //h1 = fmix32(h1);
  {
      //h ^= h >> 16;
      h1 ^= h1 >>> 16;
      //h1 *= 0x85ebca6b;
      h1 = (0x85eb0000 * h1 | 0) + (0xca6b * h1);
      //h ^= h >> 13;
      h1 ^= h1 >>> 13;
      //h1 *= 0xc2b2ae35;
      h1 = (0xc2b20000 * h1 | 0) + (0xae35 * h1);
      //h ^= h >> 16;
      h1 ^= h1 >>> 16;
  }


  return h1 >>> 0;    //convert to unsigned int

}  

function gf(){
  esy_d = new Date();

  esy_user = navigator.userAgent;
  esy_zone= esy_d.getTimezoneOffset();
  esy_screen=screen.availWidth +screen.availHeight +screen.colorDepth +screen.pixelDepth+screen.deviceYDPI+screen.deviceXDPI+screen.width+screen.height;
  esy_lang=navigator.languages[0]+navigator.languages[1]+navigator.languages[2]+navigator.systemLanguage+window.navigator.language;
  esy_hardware=navigator.hardwareConcurrency;
  esy_cookie_enabled=navigator.cookieEnabled;
  esy_java_enabled=navigator.javaEnabled();
  esy_mimetype = "";
  if(navigator.mimeTypes) {
    for (var i = 0; i < navigator.mimeTypes.length; i++) {
      esy_mimetype += navigator.mimeTypes[i].description;
    }
  }

  esy_plugin_list = "";
      for (var i = 0; i < navigator.plugins.length; i++) {     
        esy_plugin_list += navigator.plugins[i].name;   
      }

      esy_finger_print=esy_user+esy_zone+esy_screen+esy_lang+esy_hardware+esy_cookie_enabled+esy_java_enabled+esy_mimetype+esy_plugin_list;

      if(esy_finger_print.length>30){
        return generate_hash(esy_finger_print,esy_finger_print.length);
      }

}



function esy_insert_data(esy_data)
{
   document.getElementById(esy_data.container_id).innerHTML=esy_data.html;
}


function esy_go_to_option(esy_option){         

  esy_select_container = document.getElementById('r_o_'+esy_option);
  esy_selected_value=esy_select_container.options[esy_select_container.selectedIndex].value;

  if(esy_selected_value==''){
  
    alert('Please Select a Program'); return false;
    
  }else{
  
    location.href = esy_selected_value;
  }
  return false;
  
}


(function() {
    window.ESY = {};
    
    ESY.Widget = function(esy_options) {
    
        // defaults 
        if(!esy_options.type){esy_options.type='search';}//type
        if(!esy_options.new_window){esy_options.new_window='n';}//new window
        if(!esy_options.color){esy_options.color='';}//color
        if(!esy_options.bg_color){esy_options.bg_color='';}//background_color
        if(!esy_options.results){esy_options.results='';}//results
        if(!esy_options.remove_search){esy_options.remove_search='n';}//remove search on listings         
        if(!esy_options.title){esy_options.title='';}//title        
        if(!esy_options.ad_id){esy_options.ad_id='';}
        if(!esy_options.show_header){esy_options.show_header='';}
        if(!esy_options.widget_layout){esy_options.widget_layout='';}
        if(!esy_options.user_id){esy_options.user_id='';}
        if(!esy_options.current_page_url){esy_options.current_page_url=window.location.href;}
        if(!esy_options.state){esy_options.state='';}
        if(!esy_options.placement){esy_options.placement='';}
        if(!esy_options.pc){esy_options.pc='';}
        if(!esy_options.keyword){esy_options.keyword='';}
        if(!esy_options.remove_css){esy_options.remove_css='n';}


        
        //check if css already loaded via plugin
        var plugin_css =  document.getElementById('esyoh-widget-css-css');        
        if(window.esy_scripts_loaded===undefined && (typeof(plugin_css) == 'undefined' || plugin_css == null) && esy_options.remove_css=='n'){     
          
          var head = document.head;
          var link = document.createElement("link");
        
          link.type = "text/css";
          link.rel = "stylesheet";
          link.href = esy_serverFQDN + '/clients/css/widget_style.css?ver=1.0.0';
          head.appendChild(link);

          window.esy_scripts_loaded='y';
        }


          var esy_containers = document.getElementsByClassName("esy_widget_container");
          var esy_container_id;

          if(window.location.hash=='#show'){
            return false;
          }


          for (var i = 0; i < esy_containers.length; i++) {
          
              if(esy_containers[i].id===''){
      
                      esy_rand_num = Math.floor(Math.random()*200000000);     
                      esy_container_id = 'widget_container_'+ esy_rand_num;  

                      esy_containers[i].id=esy_container_id;    

                      if(esy_options.bg_color!=''){
                        esy_containers[i].classList.add("widget_color");
                        esy_containers[i].style.backgroundColor = esy_options.bg_color;
                      }


                      //clean color option for hexcode
                      esy_options.color=esy_options.color.replace("#", "hash-");
                      esy_options.bg_color=esy_options.bg_color.replace("#", "hash-");
          
                      var script = document.createElement('script');

                      var url_options='?pixel_id='+gf()+'&type='+esy_options.type+'&widget_layout='+esy_options.widget_layout+'&container_id='+esy_container_id+'&color='+esy_options.color+'&bg_color='+esy_options.bg_color+'&show_header='+esy_options.show_header+'&r='+esy_options.results+'&d='+esy_options.domain_id+'&category_id='+esy_options.category_id+'&ad_id='+esy_options.ad_id+'&pc='+esy_options.pc+'&remove_search='+esy_options.remove_search+'&new_window='+esy_options.new_window+'&callback=esy_insert_data&get_state='+esy_options.state+'&title='+encodeURIComponent(esy_options.title)+'&user_id='+esy_options.user_id+'&current_page_url='+encodeURIComponent(esy_options.current_page_url)+'&placement='+encodeURIComponent(esy_options.placement)+'&keyword='+encodeURIComponent(esy_options.keyword);          
                     
                      if(esy_options.type.toLowerCase() == 'listings'){
                        jsonp_url=esy_serverFQDN + '/clients/search_listings/'+ url_options;
                      }else{
                        jsonp_url=esy_serverFQDN + '/clients/search_widget/'+ url_options;
                      }

                       
                      script.src = jsonp_url;
                    
                      document.getElementsByTagName('head')[0].appendChild(script);

                      return false; // do one element at a time
              }
          }

     
        
    
    };
      
    

})();     



  