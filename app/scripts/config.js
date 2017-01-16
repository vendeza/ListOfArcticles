(function(ng) {
    ng.module('editor')
        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

            $routeProvider.otherwise({
                redirectTo: '/category'
            });

            $routeProvider
                .when('/article/new', {
                    template: '<edit-article></edit-article>',
                    controller: 'EditArticleCtrl'
                })
                .when('/category', {
                    template: '<articles-list></articles-list>',
                    controller: 'ArticlesListCtrl'
                })
                .when('/category/:categoryId', {
                    template: '<articles-list></articles-list>',
                    controller: 'ArticlesListCtrl'
                })
                .when('/article/edit/:articleId', {
                    template: '<edit-article></edit-article>',
                    controller: 'EditArticleCtrl'
                });
        }]);

})(angular);
