Vue.config.ignoredElements = [/as-\w+/];

const vm = new Vue({
    el: "#app",
    data: {
        geometryType: 'cities'
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
          this.$http.post('/query', {query: this.query})
            .then(response => {
              console.log(response);
            })
            .catch( error => {
              console.log(error);
            });
        }
    }
})
