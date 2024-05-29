import mongoose, { mongo } from 'mongoose'

// Slot schema
const slotSchema = new mongoose.Schema({
    orderIDs: [mongoose.Schema.Types.ObjectId],
    durationMinutes:{
        type: Number,
        default: 15
    },
    time: String,
    capacity:{
        type: Number,
        default: 0,
        max:5
    },
    creation:{
      type:Date,
      default:Date.now
    }
    // start: {
    //     type: Date,
    //     required: true
    // },
    // end: {
    //     type: Date,
    //     required: true
    // }
})  

//Creation of the timeSlot
const CreateTimeSlot = async() =>{
  try{
    const timeSlot= new Slot({
      orderIDs:[],
      durationMinutes:15,
      time:"",
      capacity:0,
      creation:Date.now
    })
    const result = await timeSlot.save()
    console.log(result)
  }
  catch(error){
    console.log(error)
  }
}

//==METHODS==//



//==VIRTUALS==//
slotSchema.virtual("")


// Export the models
const Slot = mongoose.model('Slot', slotSchema);
export default Slot;


