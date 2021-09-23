<?php

namespace Microlite;

class Microlite
{
    private $email;
    private $site;
    private $route;
    private $response;

    public function __construct()
    {
        include_once "config.php";
        $this->email = $email;
        $this->site = str_replace(["https://", "http://"], "", $website);
        $this->response["success"] = false;
    }

    private function headers()
    {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 0');

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            exit(0);
        }

        //Content Headers go here
        header('Content-Type: application/json');
    }

    private function send_email($data)
    {
        if (isset($data->email)) {
            $to = $this->email;
            $from = "contact@" . $this->site;
            $subject = 'Email From Website: ' . $this->site;
            $message = '
        <html>
        <head>
          <title>Email From Website: ' . $this->site . '</title>
        </head>
        <body>
          <h4>Email from website: ' . $this->site . '</h4>
          <h6>Message from email: ' . $data->email . '</h6>';

            foreach ($data as $key => $value) {
                if($key != 'email') {
                    $message .= "<p>" . addslashes($key) . " = " . addslashes($value) . "</p>";
                }
            }

            $message .= '</body></html>';
            $headers[] = 'MIME-Version: 1.0';
            $headers[] = 'Content-type: text/html; charset=iso-8859-1';
            $headers[] = 'To: ' . $to;
            $headers[] = 'From: ' . $from;
            $headers[] = 'Reply-To: ' . $data->email;
            $wassent = @mail($to, $subject, $message, implode("\r\n", $headers));
            if ($wassent) {
                $this->response["success"] = true;
            } else {
                $this->response["error_message"] = "cannotsendemail";
            }
        } else {
            $this->response["error_message"] = "datanotsent";
        }
    }

    public function output()
    {
        echo json_encode($this->response);
    }

    public function route($route, $data)
    {
        $this->route = $route;

        if ($route === "/app/mail") {
            $this->send_email($data);
        }
        $this->headers();
        $this->output();
    }
}