<?php
// Copyright (c) 2020 P.M. Kruyen, Institute for Management Research, Radboud University, the Netherlands. 

// TO DO: RESET AUTHENTICATION @RESPONDENT3

class ServerTest extends \PHPUnit\Framework\TestCase
{
  public function testpost_server_insertPIN_S()
    {
     $success = new App\Server;
	   $success->set_options(
	   [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'PIN' => '8888',
          'insertPIN' => 'yes'
        ]
      ]
	   );
     $this->assertEquals("success", $success->post_server());
   }


  public function testpost_server_insertPIN_E()
   {
    $error = new App\Server;
    $error->set_options(
    [
      'form_params' => [
          'uname' => 'test0',
          'pwd' => 'test5',
          'PIN' => '8888',
          'insertPIN' => 'yes'
       ]
     ]
    );
    $this->assertEquals("error", $error->post_server());
   }


   public function testpost_server_checkPIN_S()
   {
    $error = new App\Server;
    $error->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'PIN' => '8888',
          'checkPIN' => 'yes'
       ]
     ]
    );
    $this->assertEquals("success", $error->post_server());
   }


   public function testpost_server_checkPIN_E()
   {
    $error = new App\Server;
    $error->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'PIN' => '0000',
          'checkPIN' => 'yes'
       ]
     ]
    );
    $this->assertEquals("error", $error->post_server());
   }

   
   public function testpost_server_checkPIN_REVOKE()
   {
    $revoke = new App\Server;
    $revoke->set_options(
    [
      'form_params' => [
          'uname' => 'test3',
          'pwd' => 'test3',
          'PIN' => '????',
          'checkPIN' => 'yes'
       ]
     ]
    );
    $this->assertEquals("revoke", $revoke->post_server());
   }


   public function testpost_server_setDevice_S()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'token' => 'TESTTOKEN',
          'updateregistration' => 'yes'
       ]
     ]
    );
    $this->assertEquals("success", $success->post_server());
   }


   public function testpost_server_setDevice_E()
   {
    $error = new App\Server;
    $error->set_options(
    [
      'form_params' => [
          'uname' => 'test0',
          'pwd' => 'test5',
          'token' => 'TESTTOKEN',
          'updateregistration' => 'yes'
       ]
     ]
    );
    $this->assertEquals("error", $error->post_server());
   }


   public function testpost_server_authentication_S()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'authentication' => 'yes'
       ]
     ]
    );
      $this->assertJsonStringEqualsJsonFile(__DIR__ . "/authenticationTest.json",$success->post_server());
   }


   public function testpost_server_InjectDiaryStructure_S()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'findvalues' => 'yes'
       ]
     ]
    );
      $this->assertJsonStringEqualsJsonFile(__DIR__ . "/InjectedDiaryTest.json",$success->post_server());
   }


   public function testpost_server_InjectedDiaryStructure_S()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'injectedStructure' => 'yes',
       ]
     ]
    );
    $this->assertEquals("success", $success->post_server());
   }


   public function testpost_server_InjectedDiaryStructure_E()
   {
    $error = new App\Server;
    $error->set_options(
    [
      'form_params' => [
          'uname' => 'test0',
          'pwd' => 'test5',
          'injectedStructure' => 'yes',
       ]
     ]
    );
    $this->assertEquals("error", $error->post_server());
   }


   public function testpost_server_messagesCheck_S()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'messagesCheck' => 'yes'
       ]
     ]
    );
      $this->assertJsonStringEqualsJsonFile(__DIR__ . "/messagesTest.json",$success->post_server());
   }


  public function testpost_server_messagesSeen_S()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'messagesSeen' => 'yes',
       ]
     ]
    );
    $this->assertEquals("success", $success->post_server());
   }


   public function testpost_server_messagesSeen_E()
   {
    $error = new App\Server;
    $error->set_options(
    [
      'form_params' => [
          'uname' => 'test0',
          'pwd' => 'test5',
          'messagesSeen' => 'yes',
       ]
     ]
    );
    $this->assertEquals("error", $error->post_server());
   }


  public function testpost_server_postModuleA_S1()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'module' => 'moduleA',
       ]
     ]
    );
    $this->assertEquals("success", $success->post_server());
   }


  public function testpost_server_postModuleB_S1()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'module' => 'moduleB',
       ]
     ]
    );
    $this->assertEquals("success", $success->post_server());
   }

  public function testpost_server_postModuleC_S1()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'module' => 'moduleC',
       ]
     ]
    );
    $this->assertEquals("success", $success->post_server());
   }

   public function testpost_server_postModuleD_S1()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'module' => 'moduleD',
       ]
     ]
    );
    $this->assertEquals("success", $success->post_server());
   }


   public function testpost_server_postModuleE_S1()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'module' => 'moduleE',
       ]
     ]
    );
    $this->assertEquals("success", $success->post_server());
   }


   public function testpost_server_postModuleF_S1()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'module' => 'moduleF',
       ]
     ]
    );
    $this->assertEquals("success", $success->post_server());
   }


   public function testpost_server_postModuleG_S1()
   {
    $success = new App\Server;
    $success->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'module' => 'moduleG',
       ]
     ]
    );
    $this->assertEquals("success", $success->post_server());
   }


  public function testpost_server_postModule_E()
   {
    $error = new App\Server;
    $error->set_options(
    [
      'form_params' => [
          'uname' => 'test5',
          'pwd' => 'test5',
          'module' => 'module??????',
       ]
     ]
    );
    $this->assertEquals("", $error->post_server());
   }
}