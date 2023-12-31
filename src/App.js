import './main.css';
import './style.css';
import { list,col,colua,Ru,Ua,catru,catua,statesl,stateslua } from './list.js';
import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      langP: 'ru',
      lang: Ru,
      allcatP: '',
      allcat: catru,
      open: false,
      fil: [],
      curcat: '',
      curstate: '',
      curcol: '',
      sex: '',
      itemsCat: list,
      items: list,
      itemsAll: list,
      curitems: [],
      colors: col,
      states: statesl,
      search: '',
      y: false
    }
    this.allCheck = this.allCheck.bind(this)
    this.search = this.search.bind(this)
    this.addItem = this.addItem.bind(this)
    this.delitem = this.delitem.bind(this)
    this.setOpen = this.setOpen.bind(this)
    this.setCat = this.setCat.bind(this)
    this.setLang = this.setLang.bind(this)
    this.ammo = this.ammo.bind(this)
  }
  render() {
    return (
      <div className='text-red-400'>
        <Header ammo={this.ammo} setLang={this.setLang} lang={this.state.lang} langP={this.state.langP} setOpen={this.setOpen} delitem={this.delitem} open={this.state.open} curitems={this.state.curitems} curcol={this.state.curcol} search={this.search} curstate={this.state.curstate} curcat={this.state.curcat} addItem={this.addItem}/>
        <Nav states={this.state.states} langP={this.state.langP} fil={this.state.fil} allcat={this.state.allcat} colors={this.state.colors} allCheck={this.allCheck} curcol={this.state.curcol} colCheck={this.colCheck} setOpen={this.setOpen} open={this.state.open} itemsCat={this.state.itemsCat} curcat={this.state.curcat} items={this.state.items} categories={this.state.categories} ru={this.state.ru}/>
        <Main langP={this.state.langP} fil={this.state.fil} allCheck={this.allCheck} y={this.state.y} setCat={this.setCat} allcat={this.state.allcat} colors={this.state.colors} curcol={this.state.curcol} curitems={this.state.curitems} curcat={this.state.curcat} open={this.state.open} addItem={this.addItem} items = {this.state.items} lang={this.state.lang} search={this.state.search}/>
      </div>
    )
  }

  ammo(par,item){
    console.log(par)
    let arr = this.state.curitems.map(el => {
      if (el.idu === item.idu){
        return {...el,cout: el.cout + (par === '+' ? 1 : -1)}
      }
      return el
    })
    this.setState({curitems: arr})
  }

  setCat(cat){
    this.setState({curcat: cat})
    console.log(cat)
    this.allCheck(cat, this.state.curstate, this.state.curcol)
  }

  allCheck(arr) {
    let colors = []
    let states = []
    let result = this.state.itemsAll
    if (!arr[0] && !this.state.curcat){
      return
    }
    if (arr === 'del'){
      console.log(4)
      this.setState({fil: [this.state.curcat]})
      result = result.filter(el => (
        el.cat === this.state.curcat || catua[catru.indexOf(el.cat)] === this.state.curcat
      ))
      this.setState({items: result})
      this.setState({curcol: ''})
      return
    }
    this.setState({fil: arr})
    this.setState({y: true})
    this.setState({curcat: arr[0]})
    console.log(arr,this.state.curcat)

    if (arr[0]){
      result = result.filter(el => (
        el.cat === arr[0] || catua[catru.indexOf(el.cat)] === arr[0]
      ))
      console.log(result)
    }

    result.forEach(el => {
      if (!colors.includes(el.col) && el.col){
        colors.push(el.col)
      }
    })
    result.forEach(el => {
      if (!states.includes(el.sex) && el.sex){
        states.push(el.sex)
      }
    })
    this.setState({colors: colors})
    this.setState({states: states})
    console.log(colors)
    console.log(states)
    if (arr[1] && arr[0]){
      result = result.filter(el => (
        el.sex === arr[1]
      ))
      this.setState({curstate: arr[1]})
    }
    if (arr[2] && arr[0]){
      result = result.filter(el => (
        el.col === arr[2]
      ))
      this.setState({curcol: arr[2]})
    }
    console.log(this.state.fil)
    this.setState({items: result})
    this.setState({itemsCat: result})
    window.scrollTo(0,0)
  }

  setLang(p){
    this.setState({langP: p})
    console.log(p)
    if (p == 'ru'){
      this.setState({lang: Ru})
      this.setState({states: statesl})
      this.setState({allcat: catru})
      this.setState({colors: col})
      if (this.state.curcat !== 'allC'){
        this.setState({curcat: catru[catua.indexOf(this.state.curcat)]})
      }
      if (this.state.curcol !== ''){
        this.setState({curcol: col[colua.indexOf(this.state.curcol)]})
      }
    } else {
      this.setState({lang: Ua})
      this.setState({states: stateslua})
      this.setState({allcat: catua})
      this.setState({colors: colua})
      if (this.state.curcat !== 'allC'){
        this.setState({curcat: catua[catru.indexOf(this.state.curcat)]})
      }
      if (this.state.curcol !== ''){
        this.setState({curcol: colua[col.indexOf(this.state.curcol)]})
      }
    }
  }

  search(text){
    if (text){
      console.log(text)
      this.setState({items: this.state.itemsCat.filter(el => (
        el.title.toLowerCase().indexOf(text.toLowerCase()) !== -1 || el.id.indexOf(text) !== -1
      ))})
      console.log(this.state.items.filter(el => (
        el.title.toLowerCase().indexOf(text) !== -1
      )))
    } else {
      this.setState({items: this.state.itemsCat})
    }
    this.setState({search: text})
  }

  addItem(item) {
    let is = false
    if (this.state.curitems.length === 0){
      item.cout = 1
      this.setState({curitems: [...this.state.curitems, item]})
    }
    this.state.curitems.forEach(el => {
      if (el.idu === item.idu){
        let arr = []
        arr = this.state.curitems.map(el => {
          if (el.idu === item.idu){
            item.cout = 0
            return item
          }
          return el
        })
        console.log(arr)
        this.setState({curitems: [...arr.filter(i => (i.idu !== item.idu))]})
        is = true
      } else {
        if (!is){
          item.cout = 1
          this.setState({curitems: [...this.state.curitems, item]})
        }
      }
    })
  }

  delitem(item){
    return this.state.curitems.filter(el => (el !== item))
  }

  setOpen(){
    this.setState({open: !this.state.open})
  }
}
export default App