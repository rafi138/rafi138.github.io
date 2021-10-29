new Vue({
    el: '#app',
    data: {
        github_base_url: 'https://github.com/',
        github_api_base_url: 'https://api.github.com/repos/',
        github_repositories: [
            {
                name: 'bkash',
                desc: 'bkash Payment Gateway for PHP and Laravel Package',
                github_url: 'Shipu/bkash',
                is_creator: true,
                stars_count: 102,
                forks_count: 44
            },
//             {
//                 name: 'SSLwireless Payment',
//                 desc: 'Bangladesh sslwireless payment gateway for PHP and Laravel',
//                 github_url: 'Shipu/php-sslwireless-payment',
//                 is_creator: true,
//                 stars_count: 38,
//                 forks_count: 16
//             },
//             {
//                 name: 'Themevel',
//                 desc: 'Themevel is a Laravel 5+ theme and asset management package',
//                 github_url: 'Shipu/themevel',
//                 is_creator: true,
//                 stars_count: 241,
//                 forks_count: 51
//             },
//             {
//                 name: 'AamarPay Payment',
//                 desc: 'Bangladesh aamarpay payment gateway for PHP and Laravel',
//                 github_url: 'Shipu/php-aamarpay-payment',
//                 is_creator: true,
//                 stars_count: 17,
//                 forks_count: 13
//             },
//             {
//                 name: 'MUTHOFUN SMS Gateway',
//                 desc: 'MUTHOFUN is sms gateway in Bangladesh',
//                 github_url: 'Shipu/muthofun-sms-gateway',
//                 is_creator: true,
//                 stars_count: 15,
//                 forks_count: 16
//             },
//             {
//                 name: 'Laratie',
//                 desc: 'Laravel Package Development Boilerplate.',
//                 github_url: 'Shipu/laratie',
//                 is_creator: true,
//                 stars_count: 46,
//                 forks_count: 12
//             },
//             {
//                 name: 'HackerRank API',
//                 desc: 'HackerRank Code Checker API for Laravel.',
//                 github_url: 'shipu/hackerrank-api',
//                 is_creator: true,
//                 stars_count: 0,
//                 forks_count: 0
//             },
//             {
//                 name: 'Laravel Talk',
//                 desc: 'User conversation (inbox) system with realtime messaging',
//                 github_url: 'nahid/talk',
//                 is_creator: false,
//                 stars_count: 1300,
//                 forks_count: 285
//             },
        ]
    },
    mounted() {
        this.fetchGithubData();
    },
    methods: {
        fetchGithubData: function () {
            let $this = this;
            $this.github_repositories.map(function (item, key) {
                $this.apiRequest($this.buildUrl(item.github_url, true)).then((response) => {
                    if (parseInt(response.status) === 200) {
                        item.stars_count = response.data.stargazers_count;
                        item.forks_count = response.data.forks_count;
                    }
                }, (error) => {
                    console.log(error);
                });
            });
        },
        apiRequest: function (url, method = 'get', data = {}) {
            return axios({
                method: method,
                url: url,
                data: data
            });
        },
        buildUrl: function (url, is_api = false) {
            return (is_api === true ? (this.github_api_base_url + url) : (this.github_base_url + url));
        },
        getContributionClass: function (item) {
            return (item.is_creator ? 'creator' : 'contributor')
        }
    }
});
