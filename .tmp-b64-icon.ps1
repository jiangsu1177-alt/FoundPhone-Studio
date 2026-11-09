$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes('D:\FoundPhone-Studio\assets\app-icons\tinder.jpg'))
$art = 'D:\FoundPhone-Studio\src\AppArtwork.tsx'
$c = [IO.File]::ReadAllText($art)
if (-not $c.Contains('src="assets/app-icons/tinder.jpg"')) { throw 'AppArtwork: pattern not found' }
$c = $c.Replace('src="assets/app-icons/tinder.jpg"', ('src="data:image/jpeg;base64,' + $b64 + '"'))
[IO.File]::WriteAllText($art, $c)
$story = 'D:\FoundPhone-Studio\stories\template\story.json'
$s = [IO.File]::ReadAllText($story)
if (-not $s.Contains('"icon": "assets/app-icons/tinder.jpg"')) { throw 'story: pattern not found' }
$s = $s.Replace('"icon": "assets/app-icons/tinder.jpg"', '"icon": ""')
[IO.File]::WriteAllText($story, $s)
Write-Output ('base64 length: ' + $b64.Length)
