<h2><?php echo $title ?></h2>

<?php echo form_open('news/delete') ?>

    <label for="title">Delete item:</label>
    <input type="input" name="title" /><br />

    <label for="text">Text</label>
    <textarea name="text"></textarea><br />

    <input type="submit" name="submit" value="Create news item" />

</form>


