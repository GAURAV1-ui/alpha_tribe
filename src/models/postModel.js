import mongoose,{Schema} from "mongoose";

const postSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  stockSymbol: { 
    type: String,
    enum:['AAPL','GOOGL','AMZN','TSLA','MSFT','FB','NVDA','PYPL','ADBE','INTC','CSCO','NFLX','CMCSA','PEP','COST','TMUS','AVGO','QCOM','TXN','SBUX','AMGN','CHTR','MDLZ','FISV','GILD','BKNG','BIIB','ADP','REGN','INTU','ISRG','CSX','VRTX','MU'], 
    default: 'AAPL' 
},
  title: { 
    type: String, 
    required: true 
},
  description: { 
    type: String, 
    required: true 
},
  tags: [{ type: String }],

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);