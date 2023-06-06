<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: *");
/**
 *
 */
class DB
{
	public static $link = null;

	public static function connect()
	{
		self::$link = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        self::$link->set_charset("utf8mb4");
		if(self::$link->connect_error)
			echo self::$link->connect_error;
	}

	public static function query($param)
	{
		self::connect();

		$sql = self::$link->query($param);

		while($row = $sql->fetch_assoc())
		{
			$response[] = $row;
		}

		return $response;
	}

	public static function querySet($param)
	{
		self::connect();

		return  self::$link->query($param);
	}

	public static function getAll($param)
	{
		self::connect();

		$sql = self::$link->query(select . $param);

		$response = null;

		if($sql)
		{
			while($row = $sql->fetch_assoc())
			{
				$response[] = $row;
			}
		}

		return $response;

		
	}

	public static function getRow($param)
	{
		self::connect();
		// echo $param;

		return self::$link->query(select . $param)->fetch_assoc();
	}

	public static function setData($type, $param)
	{
		self::connect();

		return self::$link->query($type . $param);
	}

	public static function getString($Data)
	{
		$str = '';

		foreach ($Data as $key => $value) {
			$str .= "$key = '$value', ";
		}

		return substr($str, 0, -2);
	}

	public static function getFileName($filename)
	{
		$ext = strtolower(array_pop(explode('.', $filename)));

		return 'img' . time() . '' . random_int(1, 100) . '.' . $ext;
	}


}


?>
