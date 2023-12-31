read userInput

now=$(date +%Y-%m-%d-%H-%M-%S)

md_file_path="memo/index.md"
content_file_path="src/${now}"

cp -R templete/${userInput} src/${now}
code -r src/$now/sketch.js
code -r src/$now/index.html

echo -e "\n - [${now}](../${content_file_path})" >> "${md_file_path}"

echo "Successfully appended to ${md_file_path}"