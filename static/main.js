document
    .querySelector('as-responsive-content')
    .addEventListener('ready', () => {
        const map = new mapboxgl.Map({
                container: 'map',
                style: carto.basemaps.voyager,
                center: [10.151367,51.172455],
                zoom: 2,
                scrollZoom: false
            });
  
        vm.map = map;

        const nav = new mapboxgl.NavigationControl({ showCompass: false });
        map.addControl(nav, 'top-left');

        carto.setDefaultAuth({
            username: 'cartovl',
            apiKey: 'default_public'
        });
  
        const source = new carto.source.GeoJSON(features);
        const viz = new carto.Viz();
        const layer = new carto.Layer('layer', source, viz);
        layer.addTo(map, 'watername_ocean');
  
});