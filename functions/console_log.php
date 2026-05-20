<?php
function console_log($data)
{
    if (WP_DEBUG) {
        echo '<script>';
        echo 'console.log(' . json_encode($data) . ')';
        echo '</script>';
    }
}
