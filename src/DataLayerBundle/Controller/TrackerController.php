<?php

namespace DataLayerBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackerController extends Controller
{

    /**
     * Click tracker
     *
     * @return mixed
     */
    public function postTrackingclickAction(Request $request)
    {
        $session = $request->getSession();

        $parameters = $request->query->all();
        $this->get('logger')->info(var_export($parameters,true));
        $adId = $parameters['adId'];

        $session->set('trackedId' , $adId );

        $this->get('logger')->info(var_export($session->get('trackedId'),true));
        return new Response(sprintf('{"result":"success"}'));

    }
}
