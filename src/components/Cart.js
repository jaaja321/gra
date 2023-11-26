import React, { Component } from 'react'
import CartItem from './CartItem'
import Offer from './Offer'
export class Cart extends Component {
  constructor(props){
    super(props)
    this.state = {
      show: false
    }
    this.Show = this.Show.bind(this)
  }
  render() {
    return(
      <div className={`flex border-l border-black ${this.props.curitems.length === 0 ? 'h-[10vh]' : 'overflow-y-auto'} justify-center border-b border-b-black`}>
        {this.props.curitems.length > 0 ? 
        <div className='w-[100%] text-center pt-[8vh] max-h-[90vh]'>
          <div onClick={() => this.Show()} className={`flex text-center w-[60%] mx-auto justify-center p-4 border border-black rounded-lg hover:bg-gray-800 transition-all`}>Оформить заказ</div>
            <div className='grid grid-cols-1 md:grid-cols-2 justify-around mr-[2%] mt-2 '>
              {this.props.curitems.map(el => (
                <CartItem ammo={this.props.ammo} langP={this.props.langP} lang={this.props.lang} className='z-[80]' item={el} delitem={this.props.delitem} addItem={this.props.addItem} curitems={this.props.curitems}/>
              ))}
            </div>
          </div> : <div className='h-[10vh] flex'><p className='font-bold my-auto'>Вы не выбрали товар</p></div>}
          {this.state.show ? <Offer langP={this.props.langP} Show={this.Show} curitems={this.props.curitems}/> : null}
      </div>
    )
  }
  Show(){
    this.setState({show: !this.state.show})
    if (!this.state.show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }
}

export default Cart