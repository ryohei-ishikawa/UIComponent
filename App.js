import React from 'react';
import {
         StyleSheet,
         Text,
         View,
         Button,
         StatusBar,
         Platform,
         Switch,
         Slider,
         Picker,
         Modal
        } from 'react-native';
import {
         createStackNavigator,
         createAppContainer,
        } from 'react-navigation';
import {
         SearchBar,
         Rating,
        } from 'react-native-elements';

const STATUSBAR_HEIGHT = Platform.OS = 'ios' ? 20 : StatusBar.currentHeight;
const platform = Platform.OS == 'ios' ? 'ios' : 'android'

class Home extends React.Component {

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
          <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <View>
            <Button title="スイッチのページ" onPress={this.doAction2} />
          </View>
          <View>
            <Button title="スライダーのページ" onPress={this.doAction3} />
          </View>
          <View>
            <Button title="ピッカーのページ" onPress={this.doAction4} />
          </View>
          <View>
            <Button title="レーティングのページ" onPress={this.doAction5} />
          </View>
          <View>
            <Button title="モーダルのページ" onPress={this.doAction6} />
          </View>
        </View>
      </View>
    );
  }

  doAction1 = ()=> {
    this.props.navigation.navigate('Page1');
  }

  doAction2 = ()=> {
    this.props.navigation.navigate('Page2');
  }

  doAction3 = ()=> {
    this.props.navigation.navigate('Page3');
  }

  doAction4 = ()=> {
    this.props.navigation.navigate('Page4');
  }

  doAction5 = ()=> {
    this.props.navigation.navigate('Page5');
  }

  doAction6 = ()=> {
    this.props.navigation.navigate('Page6');
  }

}

//ボタンのページ
class Button_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'ボタンのページ'
    }
  }
  render() {
    return(
      <View>
        <Text Style={styles.container}>{this.state.title}</Text>
      </View>
    )
  }
}

//スイッチのページ
class Switch_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false
    }
  }
  render() {
    return(
      <View>
        <Text style={styles.message}>switch:{this.state.value ? 'ON':'OFF'}</Text>
        <Switch value={this.state.value} onValueChange={this.doAction} />
      </View>
    )
  }
  doAction = (value)=>this.setState({value: value});
}

//スライダーのページ
class Slider_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 50, message:'俺を動かしてみろ'};
  }
  render() {
    return (
      <View style={styles.base}>
        <Text style={styles.title}>UI</Text>
        <Text style={styles.message}>Slider: {this.state.message}</Text>
        <Slider value={this.state.value}
                onValueChange={this.doAction}
                onSlidingComplete={this.doComplete}
                minimumValue={0} maximumValue={100} step={5}/>
      </View>
    )
  }
}

//ピッカーのページ
class Picker_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message:'どれか選べ' };
  }
  render() {
    return (
      <View style={styles.base}>
        <Text style={styles.title}>UI</Text>
        <Text style={styles.message}>{this.state.message}</Text>
        <Picker prompt={'Select item:'}
                style={styles.picker} 
                itemStyle={styles.pickerItem}
                selectedValue={this.state.value}
                onValueChange={this.doAction}>
          <Picker.Item label='楽しい' value='a' />
          <Picker.Item label='悲しい' value='b' />
          <Picker.Item label='寂しい' value='c' />
          <Picker.Item label='苦しい' value='d' />
        </Picker>
      </View>
    )
  }

  doAction = (itemValue, itemIndex)=>
      this.setState({value: itemValue, message:'select: "' + itemValue + '".'})
}

//レーティングのページ
class Rating_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'check me!',};
  };
  render() {
    return (
      <View>
        <Rating showRating
                type="heart"
                ratingCount={7}
                imageSize={50}
                onFinishRating={this.doAction}
        />
      </View>
    )
  }

  doAction = (rating)=> this.setState({
    message: 'rate: [' + rating + ']'
  })
}

//モーダルのページ
class Modal_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message:'これは、モーダルのサンプル。',
      modal: false,
    }
  };
  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.title}>Layout</Text>
        <Text style={styles.message}>{this.state.message}</Text>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modal}
          onRequestClose={this.closeModal}>
          <View style={styles.modalBase}>
            <View style={styles.modalPanel}>
              <Text style={styles.modalTitle}>Modal View</Text>
              <Text style={styles.modalContent}>※これはモーダル表示のサンプルです</Text>
              <Button title="OK" onPress={this.doModalAction} />
            </View>
          </View>
        </Modal>

        <View>
          <Button title="Click" onPress={this.doAction} />
        </View>
      </View>
    );
  }

  doAction = ()=> {
    this.setState({modal:true });
  }

  doModalAction = ()=> {
    alert('close modal!');
    this.setState({ modal:false });
  }

};

const RootStack = createStackNavigator(
  {
    Page0: Home ,
    Page1: Button_ ,
    Page2: Switch_ ,
    Page3: Slider_ ,
    Page4: Picker_ ,
    Page5: Rating_ ,
    Page6: Modal_ ,
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT,
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT,
  },
  message: {
    padding: 10,
    color: 'black',
    fontSize: 32,
  },
  title: {
    paddingTop: STATUSBAR_HEIGHT,
    color:'red',
    fontSize: 60,
  },
  base: {
    paddingTop: STATUSBAR_HEIGHT,
  },
  picker: {
    width: 200,
    backgroundColor: '#FFF',
  },
  pickerItem: {
    color: 'blue'
  },
  modalBase: {
    flex:1,
    justifyContent:'center',
    backgroundColor:'#00000099',
  },
  modalPanel: {
    padding: 10,
    margin: 50,
    backgroundColor:'white',
    borderStyle:'solid',
    borderWidth:2,
    borderColor:'black',
  },
  modalTitle: {
    padding: 10,
    fontSize: 24,
    fontWeight:'bold',
  },
  modalContent: {
    padding: 10,
    fontSize: 20,
  },
  body: {
    padding:10,
    flex:1,
  },
});