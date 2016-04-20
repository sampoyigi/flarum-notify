<?php namespace Moay\Notify\Interfaces;

interface ConnectorInterface
{
    public function setup();

    public function send($message);

    public function works();
}
