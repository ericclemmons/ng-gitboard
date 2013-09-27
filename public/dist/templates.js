angular.module('gitboard').run(['$templateCache', function($templateCache) {

  $templateCache.put('gitboard/partials/get-started.html',
    "<h1>Welcome to <strong>Gitboard</strong>!</h1>\n" +
    "\n" +
    "<blockquote>\n" +
    "  <strong>Gitboard</strong> aggregates your Github projects &amp; issues\n" +
    "  into a responsive, filterable interface.\n" +
    "</blockquote>\n" +
    "\n" +
    "<div ui-view=\"\">\n" +
    "  <p>\n" +
    "    <a ui-sref=\"get-started.name\" class=\"btn btn-primary\">\n" +
    "      Get Started\n" +
    "    </a>\n" +
    "  </p>\n" +
    "</div>"
  );


  $templateCache.put('gitboard/partials/get-started.name.html',
    "<form ng-submit=\"$state.go('user', { user: gitboard.name })\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <p>\n" +
    "      To get started with aggegating your Github projects &amp; issues,\n" +
    "      enter user Github username:\n" +
    "    </p>\n" +
    "\n" +
    "    <label class=\"sr-only\">\n" +
    "      Github username:\n" +
    "    </label>\n" +
    "\n" +
    "    <div class=\"input-group\">\n" +
    "      <span class=\"input-group-addon\">\n" +
    "        <i class=\"icon-github-alt\"></i>\n" +
    "      </span>\n" +
    "\n" +
    "      <input ng-model=\"gitboard.name\" type=\"text\" class=\"form-control\" placeholder=\"Github username\" autofocus=\"\">\n" +
    "\n" +
    "      <span class=\"input-group-btn\">\n" +
    "        <button type=\"submit\" class=\"btn btn-success\">Continue</button>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>"
  );


  $templateCache.put('gitboard/partials/profile.html',
    "<a ng-href=\"{{ user.html_url }}\" target=\"_blank\">\n" +
    "  <img ng-src=\"{{ user.avatar_url }}&amp;s=26\" class=\"img-circle\" width=\"26\" height=\"26\">\n" +
    "  {{ user.name }}\n" +
    "</a>"
  );


  $templateCache.put('gitboard/partials/user.html',
    "<h3>\n" +
    "  <strong>{{ user.repos.length }}</strong>\n" +
    "  Projects\n" +
    "</h3>\n" +
    "\n" +
    "<input ng-model=\"gitboard.search\" type=\"search\" class=\"form-control input-sm\" placeholder=\"Search projects &amp; issues...\" autofocus=\"\">\n" +
    "\n" +
    "<div ng-repeat=\"repo in user.repos | orderBy:'-open_issues'\">\n" +
    "  <div>\n" +
    "    <h4 class=\"lead\">\n" +
    "      {{ repo.name }}\n" +
    "      <br>\n" +
    "      <small>\n" +
    "        {{ repo.description }}\n" +
    "      </small>\n" +
    "    </h4>\n" +
    "\n" +
    "    <ul>\n" +
    "      <li ng-repeat=\"issue in repo.issues | filter:gitboard.search\">\n" +
    "        {{ issue.title }}\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>"
  );

}]);
