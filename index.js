import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CheckboxTree from './src/CheckboxTree'
import './style.css'

const data = [{ "id": 2, "name": "Greyhounds", "code": "GHR", "competitionGroups": [{ "id": 679, "name": "US", "competitions": [{ "id": 2347, "name": "Daytona Beach" }, { "id": 2342, "name": "Palm Beach" }, { "id": 2343, "name": "Derby Lane" }, { "id": 2344, "name": "Wheeling Island" }] }, { "id": 33, "name": "AU", "competitions": [{ "id": 1808, "name": "Warragul" }, { "id": 3549, "name": "The Meadows" }, { "id": 3553, "name": "Wentworth Park" }, { "id": 7959, "name": "Bathurst" }, { "id": 7113, "name": "Shepparton" }, { "id": 12568, "name": "Hobart" }, { "id": 3559, "name": "Cannington" }, { "id": 7965, "name": "Northam" }, { "id": 4405, "name": "Albion Park" }, { "id": 1652, "name": "Sandown Park" }, { "id": 1658, "name": "Richmond" }, { "id": 7976, "name": "Launceston" }, { "id": 2436, "name": "Ipswich" }, { "id": 2437, "name": "The Gardens" }, { "id": 11859, "name": "Gunnedah" }, { "id": 2439, "name": "Warrnambool" }, { "id": 1967, "name": "Mandurah" }, { "id": 11862, "name": "Rockhampton" }, { "id": 13294, "name": "Angle Park" }, { "id": 11864, "name": "Cranbourne" }, { "id": 9204, "name": "Townsville" }, { "id": 14377, "name": "Gawler" }, { "id": 6090, "name": "Sale" }, { "id": 6091, "name": "Murray Bridge" }, { "id": 14378, "name": "Casino" }, { "id": 9871, "name": "Geelong" }, { "id": 14379, "name": "Dubbo" }, { "id": 9873, "name": "Horsham" }, { "id": 9876, "name": "Gosford" }, { "id": 14386, "name": "Bendigo" }, { "id": 9882, "name": "Lismore" }, { "id": 14387, "name": "Bulli" }, { "id": 14394, "name": "Mount Gambier" }, { "id": 14397, "name": "Ballarat" }, { "id": 14398, "name": "Nowra" }, { "id": 14401, "name": "Devonport" }] }, { "id": 11725, "name": "GB", "competitions": [{ "id": 14373, "name": "Sheffield" }, { "id": 14374, "name": "Crayford" }, { "id": 14375, "name": "Newcastle" }, { "id": 14376, "name": "Yarmouth" }, { "id": 14380, "name": "Nottingham" }, { "id": 14381, "name": "Peterborough" }, { "id": 14382, "name": "Swindon" }, { "id": 14383, "name": "Kinsley" }, { "id": 14384, "name": "Sunderland" }, { "id": 14385, "name": "Shawfield" }, { "id": 14390, "name": "Poole" }, { "id": 14391, "name": "Belle Vue" }, { "id": 14392, "name": "Pelaw Grange" }, { "id": 14393, "name": "Perry Barr" }] }] }, { "id": 1, "name": "Horse Racing", "code": "HR", "competitionGroups": [{ "id": 3, "name": "GB", "competitions": [{ "id": 3, "name": "Aintree" }, { "id": 4, "name": "Southwell" }, { "id": 5, "name": "Hereford" }, { "id": 6, "name": "Hexham" }, { "id": 7, "name": "Wolverhampton" }, { "id": 8, "name": "Lingfield" }, { "id": 9, "name": "Newcastle" }, { "id": 10, "name": "Doncaster" }, { "id": 11, "name": "Fontwell" }, { "id": 12, "name": "Uttoxeter" }, { "id": 13, "name": "Sedgefield" }, { "id": 15, "name": "Windsor" }, { "id": 16, "name": "Ripon" }, { "id": 17, "name": "Bath" }, { "id": 18, "name": "Brighton" }, { "id": 19, "name": "Bangor-on-Dee" }, { "id": 35, "name": "Chepstow" }, { "id": 48, "name": "Yarmouth" }, { "id": 57, "name": "Ascot" }, { "id": 731, "name": "TRP Extras" }, { "id": 1611, "name": "Fakenham" }, { "id": 2185, "name": "Chester" }, { "id": 1787, "name": "Ffos Las" }, { "id": 1743, "name": "Worcester" }, { "id": 10050, "name": "Newton Abbot" }] }, { "id": 5, "name": "ZA", "competitions": [{ "id": 20, "name": "Fairview" }, { "id": 25, "name": "Greyville" }, { "id": 41, "name": "Kenilworth" }, { "id": 42, "name": "Turffontein" }, { "id": 56, "name": "Vaal" }, { "id": 1505, "name": "Flamingo Park" }, { "id": 8307, "name": "Durbanville" }, { "id": 3750, "name": "Scottsville" }] }, { "id": 4, "name": "US", "competitions": [{ "id": 14, "name": "Louisiana Downs" }, { "id": 26, "name": "Evangeline Downs" }, { "id": 27, "name": "Santa Anita" }, { "id": 28, "name": "Penn National" }, { "id": 29, "name": "Golden Gate Fields" }, { "id": 30, "name": "Woodbine" }, { "id": 31, "name": "Tampa Bay Downs" }, { "id": 32, "name": "Belmont Park" }, { "id": 33, "name": "Gulfstream" }, { "id": 34, "name": "Keeneland" }, { "id": 40, "name": "Lone Star" }, { "id": 43, "name": "Emerald Downs" }, { "id": 44, "name": "Mountaineer" }, { "id": 49, "name": "Turf Paradise" }, { "id": 50, "name": "Thistledown" }, { "id": 51, "name": "Will Rogers Downs" }, { "id": 52, "name": "Finger Lakes" }, { "id": 58, "name": "Fairmount Park" }, { "id": 59, "name": "Sunland Park" }, { "id": 380, "name": "Belterra Park" }, { "id": 384, "name": "Charles Town" }, { "id": 391, "name": "Laurel Park" }, { "id": 1504, "name": "Delaware Park" }, { "id": 2120, "name": "Pimlico" }, { "id": 9069, "name": "Fort Erie" }] }, { "id": 6, "name": "AU", "competitions": [{ "id": 21, "name": "Cranbourne" }, { "id": 22, "name": "Port Macquarie" }, { "id": 23, "name": "Rockhampton" }, { "id": 24, "name": "Werribee" }, { "id": 36, "name": "Ascot" }, { "id": 37, "name": "Newcastle" }, { "id": 38, "name": "Eagle Farm" }, { "id": 39, "name": "Kyneton" }, { "id": 45, "name": "Pinjarra" }, { "id": 46, "name": "Tamworth" }, { "id": 47, "name": "Sunshine Coast" }, { "id": 53, "name": "Narromine" }, { "id": 54, "name": "Grafton" }, { "id": 55, "name": "Sale" }, { "id": 12605, "name": "Northam" }, { "id": 12606, "name": "Townsville" }, { "id": 4439, "name": "Nowra" }, { "id": 4440, "name": "Devonport" }, { "id": 14335, "name": "Pakenham" }, { "id": 14336, "name": "Coffs Harbour" }, { "id": 14337, "name": "Scone" }, { "id": 7192, "name": "Taree" }, { "id": 7193, "name": "Dubbo" }, { "id": 7194, "name": "Ballarat" }, { "id": 10962, "name": "Ipswich" }, { "id": 2519, "name": "Belmont" }, { "id": 2520, "name": "Toowoomba" }, { "id": 2521, "name": "Warracknabeal" }, { "id": 9229, "name": "Hamilton" }, { "id": 14388, "name": "Rosehill" }, { "id": 14389, "name": "Broome" }, { "id": 14395, "name": "Goulburn" }, { "id": 14396, "name": "Murwillumbah" }, { "id": 14399, "name": "Cessnock" }, { "id": 14400, "name": "Moe" }, { "id": 14402, "name": "Warrnambool" }, { "id": 14403, "name": "Armidale" }, { "id": 14404, "name": "Wagga" }, { "id": 14405, "name": "Casterton" }] }] }]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checkedElements: []
    }

    this.checkChanged = this.checkChanged.bind(this)
  }

  checkChanged(checkedItems) {
    this.setState({ ...this.state, checkedElements: checkedItems })
  }

  render() {
    const { checkedElements } = this.state
    const accessors = [
      {
        label: 'name',
        value: 'id',
        leaves: 'competitionGroups',
        type: 'sport'
      },
      {
        label: 'name',
        value: 'id',
        leaves: 'competitions',
        type: 'group'
      },
      {
        label: 'name',
        value: 'id',
        type: 'competition'
      }
    ]

    return <div className="App">
      <div style={{ width: '500px', margin: 'auto', marginTop: '100px' }}>
        <h1>Checkbox tree</h1>
        <CheckboxTree data={data} accessors={accessors} onChange={this.checkChanged} />
        <p>{JSON.stringify(checkedElements)}</p>
      </div>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

