import React from "react";
import {GenericGroupObject, GLTF} from "../gengien";


class Bake extends React.Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state={
      animation: { clipName: "Take 001" },
      position: [10.5, 0, 0]
    }
  }
  moveBake = () =>{
    let step = 0
    const stepBake = setInterval(()=>{
      step++
      this.setState({
        position: [10.5, 0, -step]
      })
      if(step >= 10 ){
        clearInterval(stepBake)
      }
    }, 1000)
  }
  componentDidMount() {
    this.moveBake()
  }

  render(){
    const { animation, position }: any = this.state
    return(
      <GenericGroupObject>
        <GLTF
          callback={[
            {
              type: "click",
              event: (e: any) => {
                console.log(e);
              },
            },
          ]}
          url={"/models/bake/scene.gltf"}
          position={position}
          animation={animation}
        />
      </GenericGroupObject>
    )
  }
}
export default Bake