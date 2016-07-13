<?php
class News extends CI_Controller {

  public function __construct()
  {
    parent::__construct();
    $this->load->model('news_model');
  }

  public function index()
  {
    $data['news'] = $this->news_model->get_news();
    $data['title'] = 'News archive';

    $this->load->view('templates/header', $data);
    $this->load->view('news/index', $data);
    $this->load->view('templates/footer');
  }

  public function view($slug = NULL)
  {
    $data['news_item'] = $this->news_model->get_news($slug);
    $this->load->view('templates/header', $data);
    $this->load->view('news/view', $data);
    $this->load->view('templates/footer');
  }

  public function create()
  {
    $this->load->helper('form');
    $this->load->library('form_validation');

    $data['title'] = 'Create a news item';

    $this->form_validation->set_rules('title', 'Title', 'required');
    $this->form_validation->set_rules('text', 'text', 'required');

    $data['msg'] = '';
    if ($this->form_validation->run())
    {
      if($this->news_model->set_news()) {
        $data['msg'] = 'Create item success!';
      }
      else {
        $data['msg'] = 'Create item failed!';
      }
    }
    $this->load->view('templates/header', $data);
    $this->load->view('news/create');
    $this->load->view('templates/footer');
  }

  public function delete($id)
  {
    $this->load->helper('url');
    if ($id > 0)
    {
      $this->news_model->delete_news($id);
    }
    redirect('/news');
  }

}