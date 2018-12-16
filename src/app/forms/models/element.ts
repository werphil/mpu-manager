
import { TreeNode } from 'primeng/api';
import { 
FormGrid,
BasePageElement,
PrefillableControl,
RepeatableControl,
ValidatableControl,
AbstractControl,
BaseFormElement,
OptionControl, 
FormElement,
FormElementModel} from './interfaces';

// ElementTypes
// ----------------------------------------------------------------

export interface FormPage extends BaseFormElement, FormGrid {}
export interface FormGroup extends BasePageElement, FormGrid {}
export interface RichText extends BasePageElement, RepeatableControl {}
export interface TextControl extends AbstractControl, PrefillableControl, RepeatableControl, ValidatableControl {
    MultiLine: boolean;
}
export interface ReadonlyControl extends AbstractControl, ValidatableControl, RepeatableControl {
    LinkedId: number;
}
export interface SelectableControl extends AbstractControl, RepeatableControl, OptionControl {}
export interface DatepickerControl extends AbstractControl, PrefillableControl, RepeatableControl {}
export interface UploadControl extends AbstractControl, RepeatableControl {}


// DataModel
// ----------------------------------------------------------------
export interface ModelElement extends FormElementModel {
    Children?: number[]; // Ids
}



// FileModel
// ----------------------------------------------------------------





// ViewModels
// ----------------------------------------------------------------
export interface SpecElement {
    Id: number;
    Label: string;
    Icon: string;
}

export interface SpecificationElement extends FormElement {
    Parent: SpecElement;
}

export interface SpecNode extends TreeNode, SpecificationElement {
}
