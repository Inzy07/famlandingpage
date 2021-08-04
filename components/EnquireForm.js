import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
export default function EnquireForm() {
  const [transLabels, settransLabels] = useState([]);
  const router = useRouter();
  const cat = router.query.cat;
  const lang = router.query.lang;
  useEffect(() => {
      fetch('https://fam-erp.com/property/website/FamLandingPageTranslation/'+cat+'/'+lang) 
        .then((res) => res.json())
        .then((data) => settransLabels(data.items[0]));
  }, []);
    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required(transLabels.client_name+' is required!'),
        email: Yup.string()
            .required(transLabels.email+' is required')
            .email(transLabels.email+' is invalid'),
        mobile: Yup.string().required(transLabels.mobile+' is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-group">
                    <label>{transLabels.client_name}</label>
                    <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>{transLabels.email}</label>
                    <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>{transLabels.mobile}</label>
                    <input name="mobile" type="text" {...register('mobile')} className={`form-control ${errors.mobile ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.mobile?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>{transLabels.note}</label>
                    <textarea name="message" type="text"></textarea>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" className="t-Button w-100">{transLabels.submit}</button>
            </div>
        </form>          
    )
}
