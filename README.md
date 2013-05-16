jlpm
====

WEB前端javascript框架

最新版本 0.1.9


jlpmLoads
=========

新增引导框架 jlpmLoads，并提供相应的帮助文件。

代码：
<!--script src="js/jlpm.loads.js" id="jlpmLoads_root" data-files="js/aaa.js js/bbb.js"></script>
</head>
<body>
  <script>
    jlpmLoads(function(){
      jlpmLoads.multiload("js/ccc.js js/ddd.js");
    });
  </script>
</body>
</html-->
