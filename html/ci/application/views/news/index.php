<h2><?php echo $title ?></h2>

<p><a href="index.php/news/create">Create News</a></p>

<?php foreach ($news as $news_item): ?>

  <h3>Title: <?php echo $news_item['title'] ?></h3>
  <div class="main">text<br/>
    <p><?php echo $news_item['text'] ?></p>
    <p><?php echo $news_item['slug'] ?></p>
  </div>
  <p><a href="news/<?php echo $news_item['slug'] ?>">View article</a></p>

<?php endforeach ?>