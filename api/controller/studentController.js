const mongoose = require('mongoose');
const Student = mongoose.model('Student');


getAll = function(req,res){
    let offset = 0;
    let count = 5;

    if(req.query && req.query.offset) offset = parseInt(req.query.offset);
    if(req.query && req.query.count) count = parseInt(req.query.count);

    console.log(`${offset} -- ${count}`)
    
    Student.find()
        .skip(offset)
        .limit(count)
        .exec(function(err,data){
            if(err){
                res.status(500).json(err.message);
                return;
            }

            res.status(200).json(data);
        });
}

getOne = function(req,res){
    const checkID = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!checkID){
        res.status(400).json({message:'invalid ID has been provided'});
        return;
    }

    Student.findById(req.params.id).exec(function(err,data){
        if(err){
            res.status(500).json(err.message);
            return;
        }

        if(!data){
            res.status(404).json({message: 'Document Not Found!..'});
            return;
        }
        res.status(200).json(data);
    });
}


module.exports = {
    getAll : getAll,
    getOne : getOne,
}