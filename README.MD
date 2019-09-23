# CSV JSON
_From csv to json in no time_

## Usage

```js
// simply pass your csv fulltext
csvjson.getJSON(csvText)

// you can also provide a custom config using CSVJson object
new CSVJson({
  eol: '\n',
  separator: ';',
  textDelimiter: '"',
  isFirstLineFieldName: true
})
.getJson(csvText)
```
