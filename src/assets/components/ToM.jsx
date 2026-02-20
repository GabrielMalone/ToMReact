import './ToM.css'
import { socket } from '../../socket'
import { useEffect } from 'react';
import { useState } from 'react';

export default function ToM() {

    const [state, setState] = useState("");


    useEffect(()=>{

        function stateHandle(data) {
            
            console.log("state updating!", data);
            setState(data)

        }

        socket.on("npc_state_update", stateHandle);

        return () => {
            socket.off("npc_state_update", stateHandle);
        };  

    },[state]);


    return(

        <div className='tomRoot'>


            <div className='ToMTitle'>
                Categorized Player Output
            </div> 

              <div className='category'>
                Sentiment Distribution
            </div> 


            <div className='categoryRow'>    
                <div className='categoryName'>
                    Avg Intensity
                </div>
                <div className='intensity'>
                    {state.research?.averageIntensity}
                </div>
            </div>

            <div className='categoryRow'>    
                <div className='categoryName'>
                    Offensive Rate
                </div>
                <div className='intensity'>
                    {state.research?.offensiveRate}
                </div>
            </div>

            <div className='beliefsList'>

            {Object.entries(state.research?.sentimentDistribution || {})
                .map(([sentiment, count]) => {

                return (
                    <div 
                    key={sentiment}
                    className='categoryRow'
                    >    
                    <div className='categoryName'>
                        {sentiment}
                    </div>
                    <div className='intensity'>
                        {count}
                    </div>
                    </div>
                );
                })}

            </div>

            <div className='category'>
                Emotion Distribution
            </div> 

            <div className='beliefsList'>

            {Object.entries(state.research?.emotionDistribution || {})
                .map(([sentiment, count]) => {

                return (
                    <div 
                    key={sentiment}
                    className='categoryRow'
                    >    
                    <div className='categoryName'>
                        {sentiment}
                    </div>
                    <div className='intensity'>
                        {count}
                    </div>
                    </div>
                );
                })}

            </div>

            <div className='category'>
                Target Distribution
            </div> 

            <div className='beliefsList'>

            {Object.entries(state.research?.targetDistribution || {})
                .map(([sentiment, count]) => {

                return (
                    <div 
                    key={sentiment}
                    className='categoryRow'
                    >    
                    <div className='categoryName'>
                        {sentiment}
                    </div>
                    <div className='intensity'>
                        {count}
                    </div>
                    </div>
                );
                })}

            </div>

             <div className='ToMTitle'>
                NPC's Relationship with Player
            </div> 

            <div className='emotionList'>
                    <div className='categoryRow'>  
                        
                        <div className='categoryName'>
                            {state.relationship}
                        </div>

                        <div className='intensity'> 
                            {state.trust}
                        </div>

                    </div>     
            </div>



            <div className='ToMTitle'>
                NPC's Emotions
            </div> 

            <div className='emotionList'>
            
                {state.allEmotions?.map(emotion => {
                    return(
                        <div 
                            key={emotion.emotion}
                            className='categoryRow'
                        >    
                            <div className='categoryName'>
                                {emotion.emotion}
                            </div>
                            <div className='intensity'> 
                                {emotion.intensity}
                            </div>

                        </div>
                    
                    );
                })}

            </div>

            <div className='ToMTitle'>
                Theory of Mind Re Player
            </div> 

            <div className='category'>
                Age
            </div> 

            <div className='beliefsList'>

                
                {state.beliefs?.age?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

             <div className='category'>
                Gender
            </div> 

            <div className='beliefsList'>

                
                {state.beliefs?.gender?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Emotions
            </div> 

            <div className='beliefsList'>

                {state.beliefs?.current_emotion?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}

            </div>

            <div className='category'>
                Goals
            </div> 

             <div className='beliefsList'>

                {state.beliefs?.goal?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}

            <div className='category'>
                History
            </div> 

            <div className='beliefsList'></div>

                {state.beliefs?.life_story?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}

            <div className='category'>
                Moral Alignment
            </div> 

            <div className='beliefsList'></div>

                {state.beliefs?.moral_alignment?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            <div className='category'>
                Personality
            </div> 

            <div className='beliefsList'></div>

                {state.beliefs?.personality_trait?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}

            <div className='category'>
                Secrets
            </div> 

            <div className='beliefsList'></div>

                {state.beliefs?.secret?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}

            </div>

            <div className='category'>
                Likes
            </div> 

            <div className='beliefsList'></div>

                {state.beliefs?.likes?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}


            <div className='category'>
                Dislikes
            </div> 

            <div className='beliefsList'></div>

                {state.beliefs?.dislikes?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}

        <div className='ToMTitle'>
                Theory of Mind Re Self
            </div> 

            <div className='category'>
                Role
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.role?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}

            </div>

            <div className='category'>
                Current Environment
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.environment_physical?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>
                        
            <div className='category'>
                Social Environment
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.environment_social?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Current State
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.current_state?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Life History
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.life_history?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Personality Trait
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.personality_trait?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>


            <div className='category'>
                Likes
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.likes?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Dislikes
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.dislikes?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Moral Alignment
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.moral_alignment?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>


            <div className='category'>
                Goals
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.goal?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>


            <div className='category'>
                Worldview
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.worldview?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Physical Condition
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.physical_condition?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Race
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.race?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Age
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.age?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Gender
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.gender?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

            <div className='category'>
                Identity
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.identity?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>


            <div className='category'>
                Physical Appearance
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.physical_appearance?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>

        
            <div className='category'>
                Fears
            </div> 

            <div className='beliefsList'>

                {state.selfBeliefs?.fear?.map(a=>{
                    return(
                    <div 
                        key={a.value}
                        className='categoryRow'
                    >    
                        <div className='categoryName'>
                            {a.value}
                        </div>
                        <div className='intensity'>
                            {a.confidence}
                        </div>
                    </div>
                    );
                })}
            
            </div>


        </div>
    );

}


    //    - age
    //     - gender
    //     - race
    //     - physical_appearance
    //     - identity
    //     - role
    //     - life_history
    //     - likes
    //     - dislikes
    //     - moral_alignment
    //     - personality_trait
    //     - goal
    //     - fear
    //     - worldview
    //     - current_environment
    //     - environment_social
    //     - environment_physical
    //     - current_state
    //     - physical_condition
