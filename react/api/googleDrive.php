<?php
require '../vendor/autoload.php';

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient()
{

  $client = new Google_Client();
  $client->setApplicationName('Google Drive API PHP Quickstart');
  $client->setScopes(
    Google_Service_Drive::DRIVE,
    Google_Service_Drive::DRIVE_METADATA,
    Google_Service_Drive::DRIVE_FILE
  );
  $client->setAuthConfig('client_secret_1077978377871-4ho6t9tie61dh0jsfvmtq9qem15jn3rp.apps.googleusercontent.com.json');
  $client->setAccessType('offline');
  $client->addScope("https://www.googleapis.com/auth/drive");
  $client->setClientId('1077978377871-4ho6t9tie61dh0jsfvmtq9qem15jn3rp.apps.googleusercontent.com');             // client id
  $client->setClientSecret('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');     // client secret 
  $client->setPrompt('select_account consent');

  // Load previously authorized token from a file, if it exists.
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  $tokenPath = 'token.json';
  if (file_exists($tokenPath)) {
    $accessToken = json_decode(file_get_contents($tokenPath), true);
    $client->setAccessToken($accessToken);
  }

  // If there is no previous token or it's expired.
  if ($client->isAccessTokenExpired()) {
    // Refresh the token if possible, else fetch a new one.
    if ($client->getRefreshToken()) {
      $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
    } else {
      // Request authorization from the user.
      $authUrl = $client->createAuthUrl();
      printf("Open the following link in your browser:\n%s\n", $authUrl);
      print 'Enter verification code: ';
      $authCode = trim(fgets(STDIN));

      // Exchange authorization code for an access token.
      $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
      $client->setAccessToken($accessToken);

      // Check to see if there was an error.
      if (array_key_exists('error', $accessToken)) {
        throw new Exception(join(', ', $accessToken));
      }
    }
    // Save the token to a file.
    if (!file_exists(dirname($tokenPath))) {
      mkdir(dirname($tokenPath), 0700, true);
    }
    file_put_contents($tokenPath, json_encode($client->getAccessToken()));
  }
  return $client;
}

if (isset($_REQUEST['logout'])) {
  unset($_SESSION['upload_token']);
}
$client = getClient();
// $service = new Google\Service\Drive($client);


function uploadFileToFolder($fileName, $filePath, $folderType = '175lG0x-RhVeNPdN3u-tbWfSKKFOZlgxR')
{

  $client = getClient();
  $service = new Google\Service\Drive($client);

  $file = new Google\Service\Drive\DriveFile([
    "name" => $fileName,
    "parents" => [
      $folderType
    ]
  ]);

  $result = $service->files->create(
    $file,
    [
      'data' => file_get_contents($filePath),
      'mimeType' => 'image/*',
      'uploadType' => 'multipart',

    ]
  );

  // print_r($result['id']);
}

// uploadFileToFolder('dadsa', './anychart.png')
?>