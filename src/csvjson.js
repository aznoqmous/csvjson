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
    this.loadCSV(data)
    console.log(this)
    return this.json()
  }
  getCSV(data){
    this.loadJSON(data)
    return this.csv()
  }

  init(){
    this.fields = []
    this.rows = []
    this.config.separator = this.guessSeparator()
    this.config.eol = this.guessEndOfLine()
  }
  guessEndOfLine(data){
    data = data || this.config.data
    if(data.split('\r\n').length) return '\r\n';
    else return '\n';
  }
  guessSeparator(data){
    data = data || this.config.data
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

  getCSVFields(){
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

  getCSVRows(){
    let textContents = this.config.data.match(new RegExp(`${this.config.separator}${this.config.textDelimiter}[^${this.config.separator}]*\n.*?${this.config.textDelimiter}${this.config.separator}`, 'g'))
    if(textContents) textContents.map( textContent => {
      this.config.data = this.config.data.replace(textContent, textContent.replace(new RegExp('\n', 'g'), this.config.eolToken))
    } )

    let rows = this.config.data.split(this.config.eol)
    rows.map( (row, i) => {
      if( !(!i && this.config.isFirstLineFieldName) && row != this.fieldLine) this.addRow(row)
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

  // imports
  loadCSV(data){
    this.config.data = data;
    this.init()
    if(this.config.isFirstLineFieldName) this.getCSVFields()
    this.getCSVRows()
  }
  loadJSON(data){

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
