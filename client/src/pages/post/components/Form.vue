<template>
    <div>
        <div class="mt-3">
            <template v-if='isUpdate'>
                <h1 class="float-left mr-4" id="title-page">Update Post</h1>
                <button class="btn btn-sm btn-outline-secondary float-right mt-1" style="margin-top: 10px;" @click="update">Update</button>
                <button class="btn btn-sm btn-outline-light float-right mt-1 mr-2 text-dark" style="margin-top: 10px;">Preview</button>
                <b-dropdown 
                    id="dropdown-form" 
                    text="Delete" 
                    ref="dropdown" 
                    variant="outline-danger"
                    size="sm"
                    class="float-right mt-1 mr-2 text-dark"
                    right
                >
                <b-dropdown-form style="width: 15rem">
                    <p>Are u sure, want to delete this article?</p>
                    <b-button variant="warning" size="sm" @click="deletePost">Yes</b-button>
                    <b-button variant="info" size="sm" @click="$refs.dropdown.hide(true)">Cancel</b-button>
                </b-dropdown-form>
                </b-dropdown>
            </template>
            <template v-else>
                <h1 class="float-left mr-4" id="title-page">Add Post</h1>
                <button class="btn btn-sm btn-outline-secondary float-right mt-1" style="margin-top: 10px;"  @click="add">Publish</button>
                <button class="btn btn-sm btn-outline-light float-right mt-1 mr-2 text-dark" style="margin-top: 10px;">Preview</button>
            </template>
        </div>
        <div style="clear: both;"></div>
        <div id="border-title-page"></div>
            <div class="mt-3" id="main-page">
                <div class="row">
                    <div class="col-lg-8">
                        <ul>
                            <li style="list-style-type: cjk-ideographic;">
                                <input class="form-control form-control-lg" type="text" placeholder="Title post" id="titlePost" v-model="form.title">
                            </li>
                            <li>
                                <input type="file" class="form-control-file mt-3" id="image" accept="image/png, image/jpeg" @change="onFileChange">
                            </li>
                            <li class="mt-3" style="list-style-type: none;">
                                <!-- <textarea name="articlePost" id="articlePost" rows="10" cols="66">
                                </textarea> -->
                                <vue-editor v-model="form.content"></vue-editor>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-4">
                        <div>
                        <p><span class="fas fa-cogs fa-lg"></span> Post Settings</p>
                        <div class="form-group">
                            <label for="exampleFormControlSelect2">Categories</label>
                            <select multiple class="form-control" id="exampleFormControlSelect2" v-model="form.tags">
                                <option  
                                    v-for="tag in tags"
                                    :key='tag._id'
                                    :value="tag._id"
                                >
                                {{tag.name}}
                                </option>
                            </select>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
    name: 'FormPost',
    components: {
        VueEditor,
    },
    props: ['postTemp'],
    data(){
        return {
            form: {
                _id: '',
                title: '',
                content: '',
                featured_image: '',
                tags: [],
            },
            tags: [],
            isUpdate: false
        }
    },
    methods: {
        onFileChange(e){
            const image = e.target.files[0]
            if (!image.length) {
                this.form.featured_image = image
            }
        },
        add(){
            // return 
            const form = this.convertToFormData()
            this.$emit('add', form)
        },
        update(){
            const form = this.convertToFormData()
            this.$emit('update', form)
        },
        deletePost(){
            this.$refs.dropdown.hide(true)
            this.$emit('deletePost', this.form._id)
        },
        preUpdate(){
            if (this.postTemp) {
                this.form = this.postTemp
                const tags = []
                this.postTemp.tags.forEach(tag => {
                    tags.push(tag._id)
                })
                this.form.tags = tags
                this.isUpdate = true
            }
        },
        convertToFormData(){
            const form = new FormData()
            for (const key in this.form) {
                if (key === 'tags') {
                    this.form[key].forEach(value => {
                        form.append(key+'[]', value)
                    })
                }else form.append(key, this.form[key])
            }
            return form
        }
    },
    mounted () {
        this.axios
        .get('/tags', {
            headers: {
                token: localStorage.getItem('mini.wp.token')
            }
        })
        .then(({data}) => {
            this.tags = data.tags
        })
        .catch(({response}) => {
            console.log(response)
        });
        this.preUpdate()
    }
}
</script>