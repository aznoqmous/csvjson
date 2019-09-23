export default class CSVJson{
  constructor(config){
    this.config = Object.assign({
      eol: '\n',
      eolToken: 'EOLEOLEOL',
      separator: ';',
      textDelimiter: '"',
      isFirstLineFieldName: true
    }, config)

  }

  getJSON(data){
    this.config.data = data;
    this.init()
    this.do()
    return this.json()
  }

  init(){
    this.fields = []
    this.rows = []
    this.config.separator = this.guessSeparator(this.config.data)
    this.config.eol = this.guessEndOfLine(this.config.data)
  }
  guessEndOfLine(data){
    if(data.split('\r\n').length) return '\r\n';
    else return '\n';
  }
  guessSeparator(data){
    let separators = [',', ';']
    let maxMatchs = 0
    let maxMatchsSeparator = separators[0]
    separators.map( separator => {
      let matchs = data.split(separator).length
      if (matchs > maxMatchs) {
        maxMatchs = matchs
        maxMatchsSeparator = separator
      }
    })
    return maxMatchsSeparator;
  }

  do(){
    if(this.config.isFirstLineFieldName) this.getFields()
    this.getRows()
  }

  getFields(){
    let firstLine = this.config.data.split(this.config.eol)[0]
    this.fieldLine = firstLine
    this.fields = this.fieldLine.split(this.config.separator)

    let fields = []
    this.fields.map(field => {
      if(field == '') field = '_'
      if(fields.includes(field)){
        field += '('+fields.join('').split(field).length+')'
      }
      fields.push(field)
    })
    this.fields = fields
  }

  getRows(){
    let textContents = this.config.data.match(new RegExp(`${this.config.separator}${this.config.textDelimiter}[^${this.config.separator}]*\n.*?${this.config.textDelimiter}${this.config.separator}`, 'g'))
    if(textContents) textContents.map( textContent => {
      this.config.data = this.config.data.replace(textContent, textContent.replace(new RegExp('\n', 'g'), this.config.eolToken))
    } )

    let rows = this.config.data.split(this.config.eol)
    rows.map( row => {
      if(row != this.fieldLine) this.addRow(row)
    } )
  }

  addRow(row){
    let values = row.split(this.config.separator)
    let newRow = {}
    this.fields.map( (field, i) => {
      let value = values[i]
      if(typeof(value) == 'string') value = value.replace(new RegExp(this.config.eolToken, 'g'), '\n')
      newRow[field] = value
    } )
    this.rows.push(newRow)
  }

  // exports
  csv(){
    let csv = '';
    this.fields.map((field, i)=>{
      csv += field
      if(i < this.fields.length - 1) csv += this.config.separator
    })
    csv += this.config.eol

    this.rows.map(row=>{
      this.fields.map((field, i) =>{
        csv += row[field]
        if(i < this.fields.length - 1) csv += this.config.separator
      })
      csv += this.config.eol
    })
    return csv
  }
  json(){
    return JSON.stringify(this.rows)
  }
}
