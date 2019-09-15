Vue.config.ignoredElements = [/as-\w+/];

const vm = new Vue({
    el: "#app",
    data: {
        geometryType: 'cities',
        map: false,
        features: {}
    },
    computed: {
        query: function() {
          let table = ''
          if (this.geometryType == 'cities'){
            table = 'ne_10m_populated_places_simple';
          } else {
            table = 'world_borders';
          }
          return `select * from ${table}`
        }
      },
    methods: {
        loadMap: function() {
          this.map = true;

          this.$http.get('/data', {params:  {query: this.query}} ).then(response => {
            this.features = JSON.parse(response.bodyText);
            console.log(this.features);
          }, response => {
            console.log('an error ocurred')
          })
        }
    },
    watch: {
    
      features: function() {

        const map = new mapboxgl.Map({
          container: 'map',
          style: carto.basemaps.voyager,
          center: [10.151367,51.172455],
          zoom: 2,
          scrollZoom: false
          });

        const nav = new mapboxgl.NavigationControl({ showCompass: false });
        map.addControl(nav, 'top-left');

        carto.setDefaultAuth({
            username: 'cartovl',
            apiKey: 'default_public'
        });

        console.log(this.features);
        const source = new carto.source.GeoJSON(this.features);
        const viz = new carto.Viz();
        const layer = new carto.Layer('layer', source, viz);
        layer.addTo(map, 'watername_ocean');
    }

  }
})
