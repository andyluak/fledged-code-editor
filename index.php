<?php

/*
  Plugin Name: Fledged Code Editor
  Version: 1.0
  Author: Alex Tirim
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class FledgedCodeEditor  {
  function __construct() {
    add_action('init', array($this, 'onInit'));
  }

  function onInit() {
    wp_register_script('code-editor-js', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    wp_register_style('code-editor-css', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_register_style('code-editor-custom-css', plugin_dir_url(__FILE__) . 'code-editor.css');
    
    register_block_type('makeupnamespace/make-up-block-name', array(
      'render_callback' => array($this, 'renderCallback'),
      'editor_script' => 'code-editor-js',
      'editor_style' => ['code-editor-css', 'code-editor-custom-css'],
    ));
  }

  function renderCallback($attributes) {
    if (!is_admin()) {
      wp_enqueue_script('code-editor-frontend-js', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
      wp_enqueue_style('code-editor-frontend-css', plugin_dir_url(__FILE__) . 'build/index.css');
      wp_enqueue_style('code-editor-custom-css', plugin_dir_url(__FILE__) . 'code-editor.css');
    }
    // map through the attributes[files] and htmlspecialchars the value
    $attributes['files'] = array_map(function($file) {
      // convert double quotes to single quotes
      $file['code'] = str_replace('"', "'", $file['code']);
      $file['code'] = htmlspecialchars($file['code']);
      return $file;
    }, $attributes['files']);

    ob_start(); ?>
    <div class="code-editor-attributes fully-fledged-code-editor"><pre style="display: none;"><?php echo json_encode($attributes) ?></pre></div>
    <?php 
    $var = ob_get_clean();
    return $var;
    
  }

  function renderCallbackBasic($attributes) {
    return '<div>HGelloo</div>';
  }
}

$code_editor = new FledgedCodeEditor();