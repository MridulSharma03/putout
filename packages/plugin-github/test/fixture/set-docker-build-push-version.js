__putout_processor_json({
   "name": "Node CI",
   "on": [
      "push",
      "pull_request"
   ],
   "jobs": {
      "build": {
         "runs-on": "ubuntu-latest",
         "steps": [
            {
               "uses": "actions/checkout@v3"
            },
            {
               "name": "Use Node.js ${{ matrix.node-version }}",
               "uses": "actions/setup-node@v1",
               "with": {
                  "node-version": "${{ matrix.node-version }}"
               }
            },
            {
               "name": "Build and push base-image",
               "uses": "docker/build-push-action@v2",
               "with": {
                  "context": "."
               }
            }
         ]
      }
   }
});
