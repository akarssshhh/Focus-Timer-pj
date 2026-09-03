$projectPath = $PSScriptRoot
$dbFile = Join-Path $projectPath "db.json"

Write-Host "Watching db.json..."
Write-Host "Automatic Git commit + push enabled."
Write-Host "Press Ctrl+C to stop."

$lastWriteTime = (Get-Item $dbFile).LastWriteTime

while ($true) {

    Start-Sleep -Milliseconds 500

    $currentWriteTime = (Get-Item $dbFile).LastWriteTime

    if ($currentWriteTime -ne $lastWriteTime) {

        $lastWriteTime = $currentWriteTime

        Write-Host ""
        Write-Host "db.json changed. Updating Git..."

        Start-Sleep -Seconds 1

        Set-Location $projectPath

        git add db.json

        git commit -m "Auto update book data"

        git push

        Write-Host "Git update completed."
    }
}