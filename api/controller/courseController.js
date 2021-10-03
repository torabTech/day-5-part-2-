const mongoose = require('mongoose');
const Student = mongoose.model('Student');


getAll = function(req,res){
    const checkSID = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!checkSID){
        res.status(400).json({message : 'Invalid ID provided'});
        return;
    }

    Student.findById(req.params.id).exec(function(err,data){
        if(err){
            res.status(500).json(err.message);
            return;
        }
        if(!data){
            res.status(404).json({message: 'document not found'});
            return;
        }
        res.status(200).json(data.course);
    });
}

getOne = function(req,res){

    const checkSID = mongoose.Types.ObjectId.isValid(req.params.id); 
    const checkCID = mongoose.Types.ObjectId.isValid(req.params.cid);
    
    console.log(checkCID)
    if(!checkSID || !checkCID){
        res.status(400).json({message:'invalid IDs have been provided'});
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

        const course = data.course.id(req.params.cid);
        if(!course){
            res.status(404).json({message: 'Course Not Found!..'});
            return;
        }
        res.status(200).json(course);
    });
}


module.exports = {
    getAll : getAll,
    getOne : getOne,
}