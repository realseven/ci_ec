<html ng-app="ecApp" xml:lang="zh-tw" lang="zh-tw">
<head>
	<title>Codeigniter 3</title>
	<!-- Meta -->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

	<!-- Fonts & CSS -->
	<link rel="stylesheet" type="text/css" href='//fonts.googleapis.com/css?family=Roboto:400,300'>
	<link rel="stylesheet" type="text/css" href="app/static/lib/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="app/static/lib/font-awesome/css/font-awesome.min.css" >

	<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
	<script src="app/static/lib/bootstrap/js/bootstrap.min.js"></script>


	<!-- Custom CSS & Favion -->
	<link href="app/css/app.css" rel="stylesheet">
	<link href="image/favicon.png" rel="shortcut icon" type="image/png">

	<!-- Angular Packages -->
	<script src="app/static/lib/angular/angular.min.js"></script>
	<script src="app/static/lib/angular/angular-cookies.min.js"></script>
	<script src="app/static/lib/angular/angular-messages.min.js"></script>
	<script src="app/static/lib/angular/angular-resource.min.js"></script>
	<script src="app/static/lib/angular/angular-route.min.js"></script>
	<script src="app/static/lib/angular/angular-sanitize.min.js"></script>
	<script src="app/static/lib/angular-translate/angular-translate.min.js"></script>
	<script src="app/static/lib/angular-translate/angular-translate-loader-static-files.min.js"></script>
	<script src="app/static/lib/angular-ui/ui-bootstrap-tpls.min.js"></script>
	<script src="app/static/lib/angular-ui/angular-ui-router.min.js"></script>
	<script src="app/static/lib/angular-ui/validate.min.js"></script>
	<script src="app/static/lib/pagin/dirPagination.js"></script>
	<!-- Custom JS -->
	<script src="app/app.js"></script>
	<script src="app/directives/directives.js"></script>
	<script src="app/util/myHelper.js"></script>
	<script src="app/util/notice.js"></script>
	<!-- App Services -->
	<script src="app/services/auth-service.js"></script>
	<script src="app/services/item-service.js"></script>
	<script src="app/services/user-service.js"></script>
	<!-- App Controller -->
	<script src="app/auth/auth-controller.js"></script>
	<script src="app/item/item.js"></script>
	<script src="app/item/item-controller.js"></script>

</head>
<body>
	<div ui-view></div>
</body>
</html>
