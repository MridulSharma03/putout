__putout_processor_json({
    "name": "Node CI",
    "on": ["push", "pull_request"],
    "jobs": {
        "build": {
            "runs-on": "ubuntu-latest",
            "steps": [{
                "uses": "actions-rs/toolchain@v1",
                'with': {
                    'toolchain': 'stble',
                },
            }],
        },
    },
});