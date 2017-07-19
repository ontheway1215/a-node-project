$urls = array(
    'https://www.chenqiangyi.cn/',
    'https://www.chenqiangyi.cn/tags/',
);
$api = 'http://data.zz.baidu.com/urls?site=https://www.chenqiangyi.cn&token=0vdS9grtq381iG53';
$ch = curl_init();
$options =  array(
    CURLOPT_URL => $api,
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS => implode("\n", $urls),
    CURLOPT_HTTPHEADER => array('Content-Type: text/plain'),
);
curl_setopt_array($ch, $options);
$result = curl_exec($ch);
echo $result;