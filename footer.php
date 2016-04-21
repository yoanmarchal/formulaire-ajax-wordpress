<?php

echo is_page('contact') ? '<script> var ajaxurl = "'.admin_url('admin-ajax.php').'"</script>' : '';
