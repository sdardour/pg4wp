<?php

/**
 * @package pg4wp
 * @version 1.0
 **/

/**
Plugin Name: PG4WP (WordPress Plugin)
Plugin URI: https://sdardour.com/lab
Description: Insert a phaser.io-based game in your WordPress posts and pages with a simple shortcode: [pg4wp]. The Plugin in action: https://sdardour.com/lab/2022/embedding-a-phaser-3-game-into-a-wordpress-post-or-page/
Author: lab@sdardour.com
Version: 1.0
Author URI: https://sdardour.com/lab
**/

/* --- */

if (!function_exists("add_action")) {

    exit;

}

/* --- */

define("PG4WP_URL", plugin_dir_url(__FILE__));
define("PG4WP_DIR", plugin_dir_path(__FILE__));

/* --- */

$PG4WP_CAN_BE_LOADED = 0;

function PG4WP_TEMPLATE_REDIRECT()
{
    global $PG4WP_CAN_BE_LOADED;

    if ((is_page() or is_single()) and (strpos(get_post(get_the_ID())->post_content, "[pg4wp]") !== false)) {

        $PG4WP_CAN_BE_LOADED = 1;

    }

}

add_action("template_redirect", "PG4WP_TEMPLATE_REDIRECT");

/* --- */

function PG4WP_WP_ENQUEUE_SCRIPTS()
{

    global $PG4WP_CAN_BE_LOADED;

    if ($PG4WP_CAN_BE_LOADED === 1) {

        wp_enqueue_script("jquery");

        wp_enqueue_script(
            "phaser3",
            PG4WP_URL . "assets/phaser/3.55.2/phaser.min.js"
        );

        wp_enqueue_script(
            "pg4wp",
            PG4WP_URL . "assets/pg4wp/1.0/pg4wp.js",
            array("jquery", "phaser3")
        );

    }

}

add_action("wp_enqueue_scripts", "PG4WP_WP_ENQUEUE_SCRIPTS");

/* --- */

function PG4WP_HTM($atts)
{

    global $PG4WP_CAN_BE_LOADED;

    if ($PG4WP_CAN_BE_LOADED === 1) {

        return "<div id='pg4wp' style='height: 100%; max-width: 640px; margin: 2rem auto; overflow: hidden;' data-path='" . PG4WP_URL . "assets/pg4wp/1.0/'></div>";

    } else {

        return "";

    }

}

add_shortcode("pg4wp", "PG4WP_HTM");

/* --- */
