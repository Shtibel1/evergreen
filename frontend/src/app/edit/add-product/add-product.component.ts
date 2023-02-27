import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categories = []
  product: Product
  editMode: boolean = false;
  addProductForm: FormGroup
  resMessage: string = null
  constructor(
    private router: Router,
     private categoryService: CategoryService,
     private route: ActivatedRoute,
     private productService: ProductService,
     ) {
    
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.product = this.productService.getProductById(params['id'])
      if (this.product) this.editMode = true
      console.log(this.product);
      
      

    this.addProductForm = new FormGroup({
      'name': new FormControl(this.editMode ? this.product.name : '', Validators.required),
      'description': new FormControl(this.editMode ? this.product.description : '', Validators.required),
      'photoUrl': new FormArray([]),
      'price': new FormControl(this.editMode ? this.product.price : '', Validators.required),
      'category': new FormControl(this.editMode ? this.product.category : null, Validators.required),
    })

    if (this.editMode) {
      this.product.photoUrl.forEach(photo => {
        const control = new FormControl(photo);
        (<FormArray>this.addProductForm.get('photoUrl')).push(control)
      })
    }
    
    })
      
    

    this.categories = this.categoryService.getCegories()

  }


  getPhotos() {
    return (<FormArray>this.addProductForm.get('photoUrl')).controls
  }

  onAddPhoto() {
    const control = new FormControl(null);
    (<FormArray>this.addProductForm.get('photoUrl')).push(control)
  }

  onSubmit() {
    let id = '-1';

    if (this.editMode) {
      id = this.product._id
    }
    
    let name = this.addProductForm.get('name').value
    let description = this.addProductForm.get('description').value
    let photoUrl = this.addProductForm.get('photoUrl').value
    let price = this.addProductForm.get('price').value
    let category = this.addProductForm.get('category').value

    let newProduct = new Product(id ,name, description, photoUrl, price, category)
    console.log(newProduct);
    this.productService.newProduct(newProduct).subscribe(res => {
      this.resMessage = res.message
    }, err => {
      this.resMessage = err.message
    })
    this.addProductForm.reset()
  }

  onDelete() {
    this.productService.deleteProductById(this.product._id).subscribe(res => {
      console.log(res);
      this.resMessage = res.message
    }) 
  }

}


