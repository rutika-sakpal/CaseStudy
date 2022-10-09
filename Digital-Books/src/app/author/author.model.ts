import { NgForm,FormGroup,Validators,FormBuilder,FormControl } from "@angular/forms";



export class Author{
    authorId:number=0;
    authorBookId:number=0;
    title:string='';
    category:string='';
    publisher:string='';
    image!:FormData;
    price:string='';
    isActive:string='';
    bookContent:string='';
    formAuthorGroup:FormGroup;//Create


    constructor(){
        var _builder=new FormBuilder();
        this.formAuthorGroup=_builder.group({});
        this.formAuthorGroup.addControl("AuthorTitleControl",new FormControl('',Validators.required));
        this.formAuthorGroup.addControl("AuthorCategoryControl",new FormControl('',Validators.required));
        this.formAuthorGroup.addControl("AuthorPublisherControl",new FormControl('',Validators.required));

        var validationcollection=[];
        validationcollection.push(Validators.required);
        validationcollection.push(Validators.pattern("^[0-9]{3,3}$"));
        this.formAuthorGroup.addControl("CustomerCodeControl",new FormControl('',Validators.compose(validationcollection)));

    }
}