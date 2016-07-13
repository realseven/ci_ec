<h2><?php echo $title ?></h2>

<table>
  <tr><th>ID</th><th>Title</th><th>Text</th><th>Slug</th><th>View</th><th>Delete</th></tr>
  <?php foreach ($news as $news_item): ?>
  <tr>
    <td><?php echo $news_item['id'] ?></td>
    <td><?php echo $news_item['title'] ?></td>
    <td><?php echo $news_item['text'] ?></td>
    <td><a href="news/<?php echo $news_item['slug'] ?>">View</a></td>
    <td><a href="news/delete/<?php echo $news_item['id'] ?>">Delete</a></td>
  </tr>
  <?php endforeach ?>
</table>