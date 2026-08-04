$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("f:\transcript\FR10-Design-Review-Complete.docx")
$text = $doc.Content.Text
$doc.Close()
$word.Quit()
$text | Out-File -FilePath "f:\transcript\review-text.txt" -Encoding UTF8
